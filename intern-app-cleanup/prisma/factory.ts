import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs, ExtensionArgs } from "@prisma/client/runtime/library";

interface IMoney {
  readonly amount: number;
  readonly currency: string;

  equals(other: Money): boolean;
}

interface IMoney {
  readonly amount: number;
  readonly currency: string;

  equals(other: IMoney): boolean; // Use IMoney for type compatibility
}

class Money implements IMoney {
  private constructor(
    public readonly amount: number,
    public readonly currency: string
  ) {}

  equals(other: IMoney): boolean {
    return (
      this.amount === other.amount &&
      this.currency === other.currency &&
      other instanceof Money // Ensure type and instance match
    );
  }

  public static create(amount: number, currency: string): Money {
    if (amount <= 0) {
      throw new Error("Amount must be positive");
    }
    return new Money(amount, currency);
  }

  public add(other: Money): Money {
    if (this.currency !== other.currency) {
      throw new Error("Cannot add money with different currencies");
    }
    return Money.create(this.amount + other.amount, this.currency);
  }
}

// Example usage:
const fiveDollars: Money = Money.create(5, "USD");
const anotherFiveDollars: Money = Money.create(5, "USD");
const tenEuros: Money = Money.create(10, "EUR");

console.log(fiveDollars.equals(anotherFiveDollars)); // Output: true
console.log(fiveDollars.equals(tenEuros)); // Output: false

interface IEntity {
  readonly hashCode: string;
}
abstract class Car implements IEntity {
  readonly hashCode: string = Car.name;
  abstract drive(): any;
}

function isCarWithHashCode(value: IEntity): value is Car {
  return value.hashCode === Car.name;
}

function isCar(value: IEntity): value is Car {
  return value instanceof Car || isCarWithHashCode(value);
}

const value: Car = {
  drive() {
    console.log("I am driving a car");
  },
  hashCode: Car.name,
};
if (isCar(value)) {
  value.drive();
}
const CarPrototype = Car.prototype;

if (Object.getPrototypeOf(value) === CarPrototype) {
  value.drive();
}
console.log(Object.getPrototypeOf(value));

interface IBook {
  id: string;
  title: string;
  authorId: string;
  //   author: IAuthor;
}
interface IAuthor {
  id: string;
  name: string;
  books: IBook[];
}

interface IDomainEvent {}
interface IDomainEventHandler<T> {
  handle(message: T): Promise<void>;
}
class BookAddedEvent {
  constructor(public readonly book: Readonly<IBook>) {}
}
class BookAddedEventHandler implements IDomainEventHandler<BookAddedEvent> {
  constructor(private readonly client: PrismaClient) {}
  async handle(message: BookAddedEvent): Promise<void> {
    await this.client.book.create({
      data: {
        title: message.book.title,
        authorId: message.book.authorId,
      },
    });
  }
}

type IRoot<T> = {
  [K in keyof T]: T[K];
} & {
  readonly events: IDomainEvent[];
};
interface IAuthorRoot extends IRoot<IAuthor> {
  addBook(title: string): void;
}

class Author implements IAuthorRoot {
  readonly events: IDomainEvent[] = [];
  constructor(
    public readonly id: string,
    public name: string,
    public readonly books: IBook[]
  ) {}
  addBook(title: string): void {
    const book = { id: "BOOK_ID", authorId: "AUTHOR_ID", title };
    this.books.push(book);
    this.events.push(new BookAddedEvent(book));
  }
  static from(author: IAuthor) {
    return new Author(author.id, author.name, author.books);
  }
}

class PrismaAuthorFactory<T> {
  constructor(private readonly client: PrismaClient) {}
  async from(id: string) {
    const author = await this.client.author.findUnique({
      where: { id },
      include: {
        books: {
          include: {
            author: true,
          },
        },
      },
    });
    return Author.from(author!);
  }
}
interface IPublisher {
  publish(event: IDomainEvent): Promise<void>;
}
const author = await new PrismaAuthorFactory<Author>(new PrismaClient()).from(
  "AUTHOR_ID"
);

author.addBook("NEW_BOOK_TITLE");

const publisher: IPublisher = {
  publish: async function (event: IDomainEvent): Promise<void> {
    if (event instanceof BookAddedEvent) {
      await new BookAddedEventHandler(new PrismaClient()).handle(event);
    }
  },
};

// observable
abstract class ChangeTracker {
  changes: [];
}

type Operation =
  | "create"
  | "createMany"
  | "update"
  | "updateMany"
  | "upsert"
  | "delete"
  | "deleteMany"
  | "aggregate"
  | "$queryRaw"
  | "$executeRaw"
  | "$queryRawUnsafe"
  | "$executeRawUnsafe"
  | "aggregateRaw"
  | "$runCommandRaw";

abstract class DbContext {
  constructor(
    protected readonly client: PrismaClient,
    protected readonly tracker: ChangeTracker = null!
  ) {}
  save(): number {
    // this.client.
    return 0;
  }
}

interface IDbSet<T, TModel extends Prisma.ModelName, TDelegate> {
  delete(
    args: Prisma.TypeMap["model"][TModel]["operations"]["deleteMany"]["args"]
  ): Prisma.TypeMap["model"][TModel]["operations"]["deleteMany"]["result"];
  update(
    args: Prisma.TypeMap["model"][TModel]["operations"]["updateMany"]["args"]
  ): Prisma.TypeMap["model"][TModel]["operations"]["updateMany"]["result"];
  create(
    args: Prisma.TypeMap["model"][TModel]["operations"]["create"]["args"]
  ): Prisma.TypeMap["model"][TModel]["operations"]["create"]["result"];
}

// type DbSet<T, TDelegate> = TDelegate;
class DbSet<T, TModel extends Prisma.ModelName, TDelegate>
  implements IDbSet<T, TModel, TDelegate>
{
  constructor(private readonly client: PrismaClient, tracker: ChangeTracker) {}
  delete(args: Prisma.AuthorDeleteManyArgs<DefaultArgs>): Prisma.BatchPayload {
    // tracker.push({method:'DELETE',args})
    // return ....
    throw new Error();
  }
}

class Context extends DbContext {
  public readonly author: IDbSet<IAuthor, "Author", Prisma.AuthorDelegate>;
  constructor(client: PrismaClient, tracker: ChangeTracker = null!) {
    super(client, tracker);
    this.author = new DbSet(client, tracker);
  }
}

const context = new Context(new PrismaClient());
context.author.delete({
  where: {
    id: {},
  },
});

class Wrapper {}
