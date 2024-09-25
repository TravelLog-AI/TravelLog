import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from '../config/firebase.config';
import { useContext, useEffect, useState } from "react";
import { UserContext } from '../context/UserContext';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';


export const IMAGE_TYPE = {
    AVATARS: 'avatars',
    BLOG: 'blog',
}

const useUploadFile = (updateImageLink, type) => {
    const [isAllowUploadImageURL, setIsAllowUploadImageURL] = useState(true);
    const [isAllowUploadImage, setIsAllowUploadImage] = useState(true);
    const [imageFile, setImageFile] = useState('');
    const [imageURL, setImageURL] = useState("");
    const [imageProgress, setImageProgress] = useState(0);

    const { userData } = useContext(UserContext);

    useEffect(() => {
        if (imageURL !== "" && imageFile === '') {
            setIsAllowUploadImage(false);
        } else if (imageFile !== '' && imageURL === "") {
            setIsAllowUploadImageURL(false);
        } else {
            setIsAllowUploadImage(true);
            setIsAllowUploadImageURL(true);
        }
    }, [imageFile, imageURL]);

    const uriToBlob = async (uri) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        return blob;
    };

    const openImagePicker = async () => {
        const options = {
            mediaType: 'photo',
            includeBase64: false,
            maxHeight: 200,
            maxWidth: 200,
            quality: 1,
        };

        console.log('Opening image picker');

        launchImageLibrary(options, async (response) => {
            console.log(response, 'response')
            if (response.didCancel) {
                console.log('User cancelled image picker');
                return;
            }
            if (response.errorCode) {
                console.log('ImagePicker Error: ', response.errorMessage);
                return;
            }
            const uri = response.assets[0].uri;
            console.log('Image URI: ', uri);
            setImageFile(uri);

            // Convert the selected file to a blob
            const blob = await uriToBlob(uri);

            // Reference where the image will be stored in Firebase
            const storageRef = ref(storage, `images/${type}/${userData?.id}/${Date.now()}`);

            // Upload the image
            const uploadImage = uploadBytesResumable(storageRef, blob);

            uploadImage.on(
                'state_changed',
                (snapshot) => {
                    const progressOfImageUpload = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setImageProgress(progressOfImageUpload);
                },
                (error) => {
                    alert('There was an error with uploading the image', error);
                },
                () => {
                    // Get the download URL after upload completes
                    getDownloadURL(uploadImage.snapshot.ref).then((downloadURL) => {
                        setImageURL(downloadURL);
                        updateImageLink(downloadURL);
                    });
                }
            );
        });
    };

    return {
      isAllowUploadImageURL,
      isAllowUploadImage,
      imageFile,
      imageProgress,
      imageURL,
      setImageFile,
      openImagePicker
    };
}

export default useUploadFile;