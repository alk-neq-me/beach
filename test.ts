import { Result, as_result, err, ok } from "./result"


class CustomError extends Error {
  constructor() {
    super("data not found")
    this.name = "Not Found"
  }
}


function fetch_data(key: string): Result<string, CustomError> {
  const data = {
    cat: "Tom",
    mouse: "Jerry"
  }[key]
  if (!data) return err(new CustomError())
  return ok(data)
}

async function fetch_data_async(key: string): Promise<Result<string, CustomError>> {
  const data = {
    cat: "Tom",
    mouse: "Jerry"
  }[key]

  return !data ? err(new CustomError()) : ok(data)
}


const unsafe = as_result((x: number) => {
  if (x) return x
  throw new Error("Not be zero!")
})


const x = unsafe(0)

console.log(x.is_err())
console.log(fetch_data("dog").is_err())

async function main() {
  const data = await fetch_data_async("dog")
  console.log(data.err()?.message)
}
main()
