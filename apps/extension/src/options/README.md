### Snippet examples
```js
const snippets: Snippet[] = [
  {
    title: "Book Summary",
    prompt: "Provide a detailed summary of the book [title] by [author]",
    parameters: [
      {
        title: "title",
        type: "string",
      },
      {
        title: "author",
        type: "string",
      },
    ],
  },

  {
    title: "Movie Review",
    prompt:
      "Write a critical review of the film [title] directed by [director]",
    parameters: [
      {
        title: "title",
        type: "string",
      },
      {
        title: "director",
        type: "string",
      },
    ],
  },

  {
    title: "Recipe",
    prompt:
      "Provide the ingredients and step-by-step instructions to make [dish]",
    parameters: [
      {
        title: "dish",
        type: "string",
      },
    ],
  },
  {
    title: "Product Description",
    prompt:
      "Write a detailed product description for [product] highlighting its key features and benefits",
    parameters: [
      {
        title: "product",
        type: "string",
      },
    ],
  },

  {
    title: "Business Pitch",
    prompt:
      "Create a one minute elevator pitch for [business] to use when introducing the business",
    parameters: [
      {
        title: "business",
        type: "string",
      },
    ],
  },

  {
    title: "Research Summary",
    prompt:
      "Summarize the key findings from the research paper [title] by [author]",
    parameters: [
      {
        title: "title",
        type: "string",
      },
      {
        title: "author",
        type: "string",
      },
    ],
  },
];

```