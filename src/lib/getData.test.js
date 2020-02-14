import getData from './getData';

/* test("Returns promise which resolves to JSON with array of 2 objects ", () => {
  const url="https://jsonplaceholder.typicode.com/posts?_limit=2";
  const result = getData(url);
  return result.then(json => expect(json).toHaveLength(2));
}); */

test("The fetch fails with an error ", () => {
   const url="https://jsonplaceholder.typicodwe.com/posts?_limit=2";
  const result = getData(url);
  return result.catch(error => expect(error).not.toThrow(Error));
});
