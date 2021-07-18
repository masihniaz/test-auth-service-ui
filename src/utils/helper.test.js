import helper from "./helper";
describe("helper", () => {
  const accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsInVzZXJuYW1lIjoiZGVtbzIiLCJlbWFpbCI6ImRlbW8yQGV4YW1wbGUuY29tIiwiaWF0IjoxNjI2NjEzOTgwLCJleHAiOjE2MjY3MDAzODB9.N-k7gjlRx77QuESYPqUby1szg58qzTVYhkx5g6qiiDk";

  describe("setAccessToken", () => {
    it("Should set a valid access token", () => {
      helper.setAccessToken(accessToken);
      const storedAccessToken = localStorage.getItem("accessToken");
      expect(accessToken).toBe(storedAccessToken);
    });
  });
  describe("getAccessToken", () => {
    it("Should get access token from local storage", () => {
      const tokenValue = "testValue";
      localStorage.setItem("accessToken", tokenValue);
      const accessToken = localStorage.getItem("accessToken");
      expect(tokenValue).toBe(accessToken);
    });
  });
  describe("getUser", () => {
    it("Should get user from local storage", () => {
      helper.setAccessToken(accessToken);
      const user = helper.getUser();
      expect(user).toMatchObject({
        email: "demo2@example.com",
        exp: 1626700380,
        iat: 1626613980,
        sub: 2,
        username: "demo2",
      });
    });
  });
  describe("removeAccessToken", () => {
    it("Should remove access token from local storage", () => {
      localStorage.setItem("accessToken", "random value");
      helper.removeAccessToken();
      const accessToken = localStorage.getItem("accessToken");
      expect(accessToken).toBeNull();
    });
  });
  describe("removeUser", () => {
    it("Should remove user from local storage", () => {
      localStorage.setItem("user", "random value");
      helper.removeUser();
      const accessToken = localStorage.getItem("user");
      expect(accessToken).toBeNull();
    });
  });
});
