import { DependencyContainer, InjectionToken } from "tsyringe";
import { AbstractHandler, Fail } from "@/lib/utilities";
import { Either } from "effect/Either";
import { Exit } from "effect/Exit";

interface HandleEither<Type, Args> {
  (cls: AbstractHandler<Type, Args>): (
    args: Args
  ) => Promise<Either<Fail, Type>>;
}

interface Handle<Type, Args> {
  (cls: AbstractHandler<Type, Args>): (args: Args) => Promise<Exit<Fail, Type>>;
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
  ): ((args: Args) => Promise<Exit<Fail, Type>>) =>
    this.handle<Type, Args>()(
      this.container.resolve<AbstractHandler<Type, Args>>(token)
    );

  service = <Type>(token: InjectionToken<Type>): Type =>
    this.container.resolve<Type>(token);
}

export class InjectorFactory {
  static create = (container: DependencyContainer): Injector =>
    new Injector(container);
}
