const bodyObj = {
  Type: "AdClick",
  Url: "google.com",
  Meta: {
    AdId: "33",
    UserId: "1231"
  }
};
function filterByTerm(inputArr, searchTerm) {
  return inputArr.filter(function(arrayElement) {
    return arrayElement.url.match(searchTerm);
  });
}
describe("filter", function() {
  test("it should filter by a search term (link)", () => {
    // actual test
    const input = [
      { id: 1, url: "https://www.url1.dev" },
      { id: 2, url: "https://www.url2.dev" },
      { id: 3, url: "https://www.link3.dev" }
    ];

    const output = [{ id: 3, url: "https://www.link3.dev" }];
    expect(filterByTerm(input, "link")).toEqual(output);
  });
});
