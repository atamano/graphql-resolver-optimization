# Graphql Resolver Optimization

Purpose of this repository is to provide an example of resolvers optimization in GraphQL to avoid overfetching.

- Usage of "field resolvers" allowing resolvers to fetch only what is necessary
- Implementation of the facebook dataloder library to cope with the N+1 problem

## Setup

```
$ yarn install
$ yarn dev
```

go to http://localhost:8080/graphql

## Example 1

Run below query in playground:

```
query {
  user(id: 2) {
    id
    cars {
      id
      model
      registration_plate
    }
  }
}
```

This query should trigger only 1 API call:

```
/users/2/cars
```

## Example 2

```
query {
  users {
    id
    firstName
    lastName
    cars {
      id
      model
      registration_plate
    }
  }
}

```

This query should trigger 2 API calls:

```
/users
/cars?ids[]=XXX&ids[]=YYY
```

## Example 3

```
query {
  user(id: 1) {
    id
    firstName
    lastName
    cars {
      id
      model
      registration_plate
    }
  }
}

```

This query should trigger only 2 API calls:

```
/users?ids[]=1
/users/1/cars
```

You can find query examples in `examples` directory.
