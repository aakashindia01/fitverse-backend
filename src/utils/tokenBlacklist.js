const blacklistedTokens = new Set();

module.exports = {
  blacklistToken: (token) => {
    blacklistedTokens.add(token);
  },
  isBlacklisted: (token) => {
    return blacklistedTokens.has(token);
  }
};
