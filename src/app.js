import { Auth, getUser } from './auth';
import { getUserFragments, getUserFragmentList, postUserFragments } from './api';

async function init() {
  // Get our UI elements
  const userSection = document.querySelector('#user');
  const loginButton = document.querySelector('#login');
  const logoutButton = document.querySelector('#logout');
  const postSection = document.querySelector('#post')
  const postButton = document.querySelector('#postButton');
  const getButton = document.querySelector('#getButton');
  const getListButton = document.querySelector('#getListButton');


  // Wire up event handlers to deal with login and logout.
  loginButton.onclick = () => {
    // Sign-in via the Amazon Cognito Hosted UI (requires redirects), see:
    // https://docs.amplify.aws/lib/auth/advanced/q/platform/js/#identity-pool-federation
    Auth.federatedSignIn();
  };
  logoutButton.onclick = () => {
    // Sign-out of the Amazon Cognito Hosted UI (requires redirects), see:
    // https://docs.amplify.aws/lib/auth/emailpassword/q/platform/js/#sign-out
    Auth.signOut();
  };

  // See if we're signed in (i.e., we'll have a `user` object)
  const user = await getUser();
  if (!user) {
    // Disable the Logout button
    logoutButton.disabled = true;
    return;
  }

  postButton.onclick = () => {
    let data = document.querySelector('#data').value;
    let type = document.querySelector('#types').value;
    postUserFragments(user,data,type);
  }

  // get the list of fragments id for the authenticated user
  getButton.onclick = () => {
    getUserFragments(user);
  }

  // get the list of expanded fragments for the authenticated user
  getListButton.onclick = () => {
    getUserFragmentList(user);
  }

  // Log the user info for debugging purposes
  console.log({ user });

  getUserFragmentList(user);

  // Update the UI to welcome the user
  userSection.hidden = false;

  // Show the user's username
  userSection.querySelector('.username').innerText = user.username;

  // Disable the Login button
  loginButton.disabled = true;
  if(loginButton.disabled = true){
    postSection.hidden = false;
  }
}

// Wait for the DOM to be ready, then start the app
addEventListener('DOMContentLoaded', init);