const path = require("path");
const fs = require("fs");
const imageDownloader = require("image-downloader");
const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const uploadByLink = async (req, res) => {
  const { link } = req.body;
  const newName = `photos${Date.now()}.jpg`;
  const uploadDir = path.join(__dirname, "uploads");

  // Ensure the uploads directory exists
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const filePath = path.join(uploadDir, newName);

  try {
    // Step 1: Download the image
    await imageDownloader.image({
      url: link,
      dest: filePath,
    });

    // Step 2: Read the downloaded file
    const fileContent = fs.readFileSync(filePath);

    // Step 3: Upload to S3
    const uploadParams = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: newName,
      Body: fileContent,
      ACL: "public-read", // Make the file publicly readable
      ContentType: "image/jpeg", // Set the correct MIME type
      ContentDisposition: "inline", // Ensure the image displays inline
    };

    const s3Response = await s3.upload(uploadParams).promise();

    // Step 4: Remove the file from local uploads folder
    fs.unlinkSync(filePath);

    // Step 5: Respond with the S3 URL
    console.log(s3Response);
    res.json({ url: s3Response.Location });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const uploadPhoto = async (req, res) => {
  try {
    const files = req.files;

    // Upload each file to S3
    const uploadPromises = files.map((file) => {
      const fileContent = fs.readFileSync(file.path);

      const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: file.originalname,
        Body: fileContent,
        ACL: "public-read", // Make the file publicly readable
        ContentType: "image/jpeg", // Set the correct MIME type
        ContentDisposition: "inline", // Ensure the image displays inline
      };

      return s3.upload(params).promise();
    });

    // Wait for all uploads to complete
    const uploadResponses = await Promise.all(uploadPromises);

    // Extract URLs of uploaded files
    const fileUrls = uploadResponses.map((response) => response.Location);
    console.log(fileUrls);
    res.status(200).json({ urls: fileUrls });
  } catch (error) {
    console.error("Error uploading images:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteFileFromS3 = async (req, res) => {
  const name  = req.params.name;
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: name,
  };
  try {
    await s3.deleteObject(params).promise();
    res.status(200).json({ message: "File deleted successfully" });
  } catch (error) {
    console.error("Error deleting file:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = { uploadByLink, uploadPhoto,deleteFileFromS3,s3 };
