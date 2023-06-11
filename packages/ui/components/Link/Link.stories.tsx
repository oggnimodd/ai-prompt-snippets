import Link from "./Link";

export const Default = () => {
  return (
    <div>
      <div className="flex gap-x-4">
        <Link href="http://localhost:61000/?story=button--variants">
          Internal Link
        </Link>
        <Link className="text-red-500" external href="https://www.google.com">
          External Link
        </Link>
        <Link
          data-cy="test-dataCy"
          className="text-red-500"
          external
          href="https://www.google.com"
        >
          With data-cy attribute
        </Link>
      </div>
      <p className="mt-5">
        *check <b>data-cy</b> using devtools
      </p>
    </div>
  );
};
