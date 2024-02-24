import { DependencyContainer, InjectionToken } from "tsyringe";
import { AbstractHandler, IInjector, IPipeline, IResult } from "@/types";

interface Handle<Type, Args> {
  (cls: AbstractHandler<Type, Args>): (args: Args) => IResult<Type>;
}

export abstract class AbstractValueProvider<T> {
  constructor(protected _value: T) { }
  get value(): Readonly<T> {
    return this._value;
  }
  private set setValue(value: T) {
    this._value = value;
  }
  changeValue = (value: T) => (this.setValue = value);
}
class Injector implements IInjector {
  constructor(private readonly _container: DependencyContainer, private readonly pipelines: IPipeline<any, any>[]) { }

  _applyPipelines = <Type, Args>(handler: AbstractHandler<Type, Args>, args: Args, pipelines: IPipeline<Type, Args>[]) => {
    const runPipelines = (pipelines: IPipeline<Type, Args>[]): IResult<Type> => {
      if (pipelines.length == 0) return handler.handle(args)
      const [pipeline, ...restPipelines] = pipelines
      return pipeline.handle(args, () =>
        runPipelines(restPipelines))
    }
    return runPipelines(pipelines)
  }


  private _handle =
    <Type, Args>(): Handle<Type, Args> =>
      (cls: AbstractHandler<Type, Args>) =>
        (args: Args) =>
          this._applyPipelines(cls, args, this.pipelines);

  private get container(): DependencyContainer {
    return this._container;
  }

  inject = <Type, Args>(
    token: InjectionToken<AbstractHandler<Type, Args>>
  ): ((args: Args) => IResult<Type>) =>
    this._handle<Type, Args>()(
      this.container.resolve<AbstractHandler<Type, Args>>(token)
    );

  service = <Type>(token: InjectionToken<Type>): Type =>
    this.container.resolve<Type>(token);

  provider = <Type>(
    token: InjectionToken<AbstractValueProvider<Type>>
  ): AbstractValueProvider<Type> =>
    this.container.resolve<AbstractValueProvider<Type>>(token);
}

export class InjectorFactory {
  static create = (container: DependencyContainer, pipelines: IPipeline<unknown, unknown>[]): Injector =>
    new Injector(container, pipelines);
}


