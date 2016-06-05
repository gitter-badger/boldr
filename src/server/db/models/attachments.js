import Promise from 'bluebird';
import bcrypt from 'bcryptjs';
import fileType from 'file-type';
import mime from 'mime';
import { uploadAttachment, downloadAttachment, generateName } from 'server/lib/upload/attachments';
module.exports = (sequelize, DataTypes) => {
  const Attachment = sequelize.define('Attachment', {
    s3Url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    s3Filename: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    filename: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    s3Metadata: {
      type: DataTypes.JSONB,
      defaultValue: ''
    },
    more: {
      type: DataTypes.JSONB,
      defaultValue: '',
      allowNull: true
    },
    userId: {
      type: DataTypes.INTEGER
    },
    size: {
      type: DataTypes.INTEGER
    },
    mime_type: {
      type: DataTypes.STRING
    }
  }, {
    timestamps: true,
    tableName: 'attachments',
    classMethods: {
      associate(models) {
        Attachment.belongsTo(models.User, {
          foreignKey: 'userId'
        });
      }
    }
  });

  // Method 2 via the .hook() method
  Attachment.hook('beforeCreate', async function (fileName, fileData, attributes = {}) {
      const attachment = Attachment.build();
      const generatedName = generateName(fileName);
      const typeInfo = fileType(fileData);

      if (!typeInfo) {
        throw new Error('Unrecognized file type');
      }

      const response = await uploadAttachment(generatedName, fileData, typeInfo.mime);

      return await attachment.save({
        ...attributes,
        s3Url: response.Location,
        s3Filename: generatedName,
        filename: fileName,
        size: fileData.length,
        mimeType: typeInfo.mime
      });
    }
  );

  return Attachment;
};
