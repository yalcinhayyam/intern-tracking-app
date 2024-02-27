interface IEntity {}

function EntityTypeGenerator() {
  return class implements IEntity {};
}

class Book extends EntityTypeGenerator() {}
