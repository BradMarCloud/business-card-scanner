import { gql } from "@apollo/client";

export const QUERY_BANDS = gql`
  query QUERY_BANDS {
    bands {
      _id
      type
      maxUsers
      maxCustomFields
      creditAllowance
      price
    }
  }
`;

export const QUERY_CheckUser = gql`
  query QUERY_CheckUser($username: String!, $domainName: String!) {
    checkUser(username: $username, domainName: $domainName) {
      clientId
    }
  }
`;
