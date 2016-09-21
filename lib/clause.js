
/*
 * A container for sql clauses.
 */


function getOrSetClause(field, clause, addition = null, separator = ' ') {
  if (addition === null) return clause;

  clause[field] += separator + clause;

  return clause;
}

const Clause = {

  create({ select = '', join = '', where = '', order = '' }) {
    return Object.create({ select, join, where, order });
  }

, select(clause, addition) {
    return getOrSetClause('select', clause, addition, ', ');
  }

, join(clause, addition) {
    return getOrSetClause('join', clause, addition);
  }

, where(clause, addition) {
    return getOrSetClause('where', clause, addition);
  }

, order(clause, addition) {
    return getOrSetClause('order', clause, addition);
  }

, applyToSqlFactory(clause, factory) {
    return factory(clause);
  }
};


module.exports = Clause;
