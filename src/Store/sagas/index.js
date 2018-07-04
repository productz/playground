// Frequently we need some certainty of certain data, authentication state for example, before
// we can properly run our sagas. This init blocks execution of any forks after, giving us a
// place to run whatever checks we need before proceeding.
function * init () {
    console.log("hello init!")
}

export function * sagas () {
  yield call(init)
  yield fork(routing)
}