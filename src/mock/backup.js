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
  
  const API_KEY = '2c78b05e5a7932fa2bceffcb48736443';
  const UPLOAD_SERVER_URL = 'https://www27.api2convert.com/v2/dl/web7';
  const JOB_ID = '4171a9fa-0daf-4c70-91d5-e1a7915e4911';
  const JOB_TOKEN = 'fb680bbce0ab4f192b47c02cb07fda7b';
  const UUID = '4201c6b6-42f4-4b58-ad1f-157d55a68a00';
  
  const FileUploadScreen = () => {
    const [choosedFile, setChoosedFile] = useState(null);
    const [choosedFileBase64, setChoosedFileBase64] = useState('');
    const [uploadProgress, setUploadProgress] = useState('Upload progress: 0%');
    const [loading, setLoading] = useState(false);
  
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
      } catch (err) {
        console.error('Error creating', err);
      }
    }
  
    async function uploadFile() {
      const fileUri = choosedFile[0].fileCopyUri;
      const selectedFile = choosedFile[0]
      const uploadUrl = UPLOAD_SERVER_URL.concat('/upload-file/').concat(JOB_ID); // Replace with your server's upload URL
  
      try {
        setLoading(true);
        const fileSize = await RNFS.stat(fileUri);
        const chunkSize = 1024 * 1024; // 1MB chunk size, adjust as necessary
        const chunks = Math.ceil(fileSize.size / chunkSize);
  
        console.log('====>', {
          fileSize,
          chunkSize,
          chunks,
        });
  
        let formData = new FormData();
  
        for (let i = 0; i < chunks; i++) {
          const start = i * chunkSize;
          const end = Math.min(fileSize.size, start + chunkSize);
  
          const fileChunk = await RNFS.read(fileUri, chunkSize, start, 'base64');
  
          formData.append('file', fileChunk);
          // console.log('fileChunk', fileChunk);
  
          // Progress tracking
          const percentCompleted = Math.round((end / fileSize.size) * 100);
          console.log(`Upload progress: ${percentCompleted}%`);
          setUploadProgress(`Upload progress: ${percentCompleted}%`);
  
          // Upload chunk to server
          const response = await axios.post(uploadUrl, formData, {
            headers: {
              'content-type': 'multipart/form-data',
              'x-oc-upload-uuid': UUID,
              'content-range': `${start}-${end}/${chunks}`,
              'x-oc-api-key': API_KEY,
            },
          });
  
          console.log('response', response);
  
          // Clear formData for next chunk
          formData = new FormData();
        }
  
        console.log('the end of upload');
  
        setLoading(false);
        console.log('Upload completed successfully!');
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
  
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1, padding: 20, gap: 20}}>
          <Text>{JSON.stringify(choosedFile, null, 2)}</Text>
          <Text style={{fontSize: 20}}>{uploadProgress}</Text>
  
          <Button title="Pick File" onPress={() => handleFilePicker()} />
          <Button title="Create Job" onPress={() => createNewJob()} />
          <Button title="Upload File & Process" onPress={() => uploadFile()} />
        </View>
  
        {loading && <ActivityIndicator size={'large'} color={'#000000'} />}
      </SafeAreaView>
    );
  };
  
  export default FileUploadScreen;
  
  const styles = StyleSheet.create({});
  