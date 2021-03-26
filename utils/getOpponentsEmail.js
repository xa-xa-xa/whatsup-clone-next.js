export default function getOpponentsEmail(usersArray, loggedInUser) {
  return usersArray?.filter((user) => user !== loggedInUser.email)[0];
}
