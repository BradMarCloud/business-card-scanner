import { gql } from "@apollo/client";

export const MUTATION_Login_User = gql`
  mutation MUTATION_User($username: String!, $domainName: String!) {
    user(username: $username, domainName: $domainName) {
      token
      user {
        _id
        username
        firstName
        lastName
        creditsUsedMonthly
        creditsUsedTotal
        code
        lastLogin
        createdDate
        savedToken
      }
      credentials {
        buid
        clientId
        clientSecret
        redirectUrl
        version
      }
    }
  }
`;

export const MUTATION_UpdateAppUsersCredits = gql`
  mutation MUTATION_UpdateAppUsersCredits {
    updateAppUsersCredits {
      creditsUsedMonthly
      creditsUsedTotal
      totalCreditsUsedMonthly
      totalCredits
    }
  }
`;
