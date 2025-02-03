import {
  ActivityIndicator,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';
import axios from 'axios';
import RNFS from 'react-native-fs';
import { createThumbnail } from 'react-native-create-thumbnail';

const API_KEY = '2c78b05e5a7932fa2bceffcb48736443';
// const UPLOAD_SERVER_URL = 'https://www13.api2convert.com/v2/dl/web7';
// const JOB_ID = '96c9522e-29e4-4017-9bd3-baf9fae04153';
const JOB_TOKEN = 'fb680bbce0ab4f192b47c02cb07fda7b';
const UUID = '4201c6b6-42f4-4b58-ad1f-157d55a68a00';

const FileUploadScreen = () => {
  const [choosedFile, setChoosedFile] = useState(null);
  const [choosedFileBase64, setChoosedFileBase64] = useState('');
  const [uploadProgress, setUploadProgress] = useState('Upload progress: 0%');
  const [loading, setLoading] = useState(false);

  const [jobDetails, setJobDetails] = useState({
    upload_server_url: 'https://www11.api2convert.com/v2/dl/web7',
    job_id: '88208977-a0cb-4f90-bba8-99a0ac9194f4',
  });

  async function createNewJob() {
    try {
      const response = await axios.post(
        'https://api.api2convert.com/v2/jobs',
        {
          conversion: [
            {
              category: 'archive',
              target: 'zip',
            },
          ],
          process: false,
        },
        {
          headers: {
            'x-oc-api-key': API_KEY,
            'content-Type': 'application/json',
          },
        },
      );

      console.log('response=>', JSON.stringify(response.data, null, 2));
      setJobDetails({
        upload_server_url: response.data.server,
        job_id: response.data.id,
      });
    } catch (err) {
      console.error('Error creating', err);
    }
  }

  async function uploadFile() {
    const uploadUrl = jobDetails.upload_server_url
      .concat('/upload-file/')
      .concat(jobDetails.job_id); // Replace with your server's upload URL

    try {
      setLoading(true);

      const body = new FormData();

      body.append('file', {
        name: choosedFile[0].name,
        uri: choosedFile[0].fileCopyUri,
        type: choosedFile[0].type,
      });

      const response = await axios.post(uploadUrl, body, {
        headers: {
          'content-type': 'multipart/form-data',
          'x-oc-api-key': API_KEY,
        },
        onUploadProgress: function (progress) {
          console.log('onUploadProgress===>', progress);
          const percentCompleted = Math.round((progress.loaded * 100) / progress.total);
          setUploadProgress(`Upload progress: ${percentCompleted}%`)
          console.log(`Upload progress: ${percentCompleted}%`);
        },
      });

      setLoading(false);
      console.log(
        'Upload completed successfully!',
        JSON.stringify(response.data, null, 2),
      );
    } catch (error) {
      setLoading(false);
      console.error('Upload failed:', error);
      throw error;
    }
  }

  const handleFilePicker = async () => {
    try {
      const documentPickupResult = await DocumentPicker.pick({
        allowMultiSelection: true,
        mode: 'open',
        presentationStyle: 'overFullScreen',
        transitionStyle: 'coverVertical',
        copyTo: 'documentDirectory',
      });

      if (documentPickupResult.length) {
        const files = documentPickupResult;
        console.log('files', files.length);
        setChoosedFile(files);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onCreateCover = async () => {
   await createThumbnail({
      url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
      timeStamp: 10000,
    })
      .then(response => console.log({ response }))
      .catch(err => console.log({ err }));
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, padding: 20, gap: 20}}>
        <Text>{JSON.stringify(choosedFile, null, 2)}</Text>
        <Text style={{fontSize: 20}}>{uploadProgress}</Text>

        <Button title="Pick File" onPress={() => handleFilePicker()} />
        <Button title="Create Job" onPress={() => createNewJob()} />
        <Button title="Upload File & Process" onPress={() => uploadFile()} />
        <Button title="Make Thumbail" onPress={() => onCreateCover()} />
      </View>

      {loading && <ActivityIndicator size={'large'} color={'#000000'} />}
    </SafeAreaView>
  );
};

export default FileUploadScreen;
