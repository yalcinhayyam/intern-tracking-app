import { DependencyContainer, InjectionToken } from "tsyringe";
import { AbstractHandler, Result } from "@/lib/utilities";

interface Handle<Type, Args> {
  (cls: AbstractHandler<Type, Args>): (args: Args) => Result<Type>;
}

export abstract class AbstractValueProvider<T> {
  constructor(protected _value: T) {}
  get value(): T {
    return this._value;
  }
  set setValue(value: T) {
    this._value = value;
  }
  changeValue = (value: T) => (this.setValue = value);
}
class Injector {
  constructor(private readonly _container: DependencyContainer) {}
  private handle =
    <Type, Args>(): Handle<Type, Args> =>
    (cls: AbstractHandler<Type, Args>) =>
    (args: Args) =>
      cls.handle(args);

  private get container(): DependencyContainer {
    return this._container;
  }

  inject = <Type, Args>(
    token: InjectionToken<AbstractHandler<Type, Args>>
  ): ((args: Args) => Result<Type>) =>
    this.handle<Type, Args>()(
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
  static create = (container: DependencyContainer): Injector =>
    new Injector(container);
}
