import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";




// const firebaseConfig = {
//     apiKey: "AIzaSyBK9vq7hwsbxUBOcIlVfbr5KYwYjRhxYtE",
//     authDomain: "teenpatticasino-677b5.firebaseapp.com",
//     projectId: "teenpatticasino-677b5",
//     storageBucket: "teenpatticasino-677b5.appspot.com",
//     messagingSenderId: "387095512431",
//     appId: "1:387095512431:web:ff445fd27863f13777949a",
//     measurementId: "G-TL3F9VCFMJ"
//   };

const firebaseConfig = {
  apiKey: "AIzaSyDxs1rqyNFTrSVn9V1s4Wi4kFUSVJp-tNo",
  authDomain: "teenpatti-play.firebaseapp.com",
  projectId: "teenpatti-play",
  storageBucket: "teenpatti-play.appspot.com",
  messagingSenderId: "808093078257",
  appId: "1:808093078257:web:87c46b39d212ba4a93cf50",
  measurementId: "G-2EE2JXHG85"
};

  const app = initializeApp(firebaseConfig);

  export const auth = getAuth(app);
  export const db = getFirestore(app);
