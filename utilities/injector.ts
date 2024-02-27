import { DependencyContainer, InjectionToken } from "tsyringe";
import { AbstractHandler, IInjector, IPipeline, IResult } from "@/types";

interface Handle<Type, Args> {
  (cls: AbstractHandler<Type, Args>): (args: Args) => IResult<Type>;
}


class Injector implements IInjector {
  constructor(private readonly _container: DependencyContainer) { }

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
        (args: Args) => cls.handle(args)
          // this._applyPipelines(cls, args, this.pipelines);

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


}

export class InjectorFactory {
  static create = (container: DependencyContainer): Injector =>
    new Injector(container);
}


