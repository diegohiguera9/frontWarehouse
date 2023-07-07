import { cookies } from "next/headers";

export default async function page() {
  const {props} = await getData();
  return (
    <>
      <h1 className="mb-3 text-2xl font-semibold">Hola soy Diego</h1>
      <h2>{`Token is: ${props.token}`}</h2>
      <h2>{`Token is: ${props.diego}`}</h2>
      <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
        -&gt;
      </span>
    </>
  );
}

async function getData() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  return { props: { token: token.value, diego: "hi" } };
}
