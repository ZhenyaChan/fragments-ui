# fragments-ui

- Web App for managing authentication with User Pool and testing fragments microservice back-end.
- Requires sign-up/sign in before testing the requests.

## How to Set Up and Run the Web App

1. Create an empty folder
2. Add the folder to workplace area in VS Code and open terminal OR navigate to the created folder using terminal
3. Enter to the terminal:
   `git clone https://github.com/ZhenyaChan/fragments-ui.git`
4. Enter for installing all project dependencies: `npm i` or `npm ci` (clean install) 
5. Run the web app: `npm start`

## How to Use the Web App

<img style="display: inline-block; margin: 0 auto; max-width: 300px" alt="Assignment-2 Web App screenshot" src="https://user-images.githubusercontent.com/75372029/201751179-a2e2b375-edb1-4465-a492-0449d7215178.png">

- To create a new fragment:
   1. Select the fragment type from drop-down list
   2. Enter the data in the text field
   3. Click on `POST` button
   4. The Developer's Tool Console will display your newly created fragment
- To retrieve the list of fragments IDs for the current user:
   1. Click on `GET fragments IDs` button
   2. The Developer's Tool Console will display the array of your existing fragments IDs
- To retrieve the list of fragments metadata for the current user:
   1. Click on `GET fragments expanded` button
   2. The Developer's Tool Console will display the array of your existing fragments metadata

```sh
NOTE: the requests buttons will not work unless the web app is connected to the server URL inside .env file.
```

## Video Walk-through

The video walk-through for this project is available via this link: [fragments-microservice](https://www.youtube.com/watch?v=E4285LQxbhA)