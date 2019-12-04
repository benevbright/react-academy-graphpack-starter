import getnerateId from "uuid/v4";
const data = require("./data.json");

const resolvers = {
  Query: {
    users: (_, { limit, searchEmail }) => {
      if (searchEmail)
        return data.users.filter(user => user.email.includes(searchEmail));
      return data.users.slice(0, limit);
    },
    user: (_, { id }) => {
      if (id != null) return data.users.find(user => user.id === id);
      throw new Error("invalid-param");
    },
    articles: _ => {
      return data.articles;
    },
    article: (_, { id }) => {
      return data.articles.find(article => article.id === id);
    },
    me: () => {
      return data.users[0];
    }
  },
  User: {
    articles: user => {
      return data.articles.filter(article => article.authorId === user.id);
    }
  },
  Article: {
    author: article => {
      return data.users.find(user => user.id === article.authorId);
    }
  },
  Mutation: {
    createArticle: (_, { article }) => {
      const newArticle = {
        id: getnerateId(),
        ...article
      };
      data.articles.push(newArticle);
      return newArticle;
    },
    updateArticle: (_, { id, article }) => {
      const articleIndex = data.articles.findIndex(
        article => article.id === id
      );
      if (articleIndex === -1) throw new Error("no-article-found");

      const findArticle = data.articles[articleIndex];
      const updatedArticle = {
        id: findArticle.id,
        ...article
      };
      data.articles[articleIndex] = updatedArticle;
      return updatedArticle;
    },
    updateUser: (_, { id, userInput }) => {
      const userIndex = data.users.findIndex(user => user.id === id);
      if (userIndex === -1) throw new Error("no-user-found");

      const findUser = data.users[userIndex];
      const updatedUser = {
        ...findUser,
        ...userInput
      };
      data.users[userIndex] = updatedUser;
      return updatedUser;
    }
  }
};

export default resolvers;
