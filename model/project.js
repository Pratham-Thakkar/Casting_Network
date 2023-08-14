const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require("uuid");

const ProjectSchema = new Schema(
  {
    projectId: {
      type: String,
      required: true,
      unique: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    projectName: {
      type: String,
      required: true,
    },
    internalProjectName: String,
    projectType: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "ProjectType",
    },
    union: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Union",
    },
    projectDescription: String,
    showContactInfo: {
      type: Boolean,
      default: true,
    },
    showNetworkToTalent: {
      type: Boolean,
      default: true,
    },
    showCastingAssociateToTalent: {
      type: Boolean,
      default: true,
    },
    showCastingAssistantToTalent: {
      type: Boolean,
      default: true,
    },
    showContactNumberToTalent: {
      type: Boolean,
      default: true,
    },
    showContantEmailToTalent: {
      type: Boolean,
      default: true,
    },
    cdNameContactInfo: String,
    castingAssociateContactInfo: String,
    castingAssistantContactInfo: String,
    castingPhoneNumberContactInfo: String,
    castingEmailContactInfo: String,
    networkCreativeTeam: String,
    castingAssociateCreativeTeam: String,
    castingAssistantCreativeTeam: String,
    contactPhoneNumberCreativeTeam: String,
    contactEmailCreativeTeam: String,
    projectSynopsis: String,
    projectAdditionalDetails: String,
    additionalFileLink: [String],
    published: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

ProjectSchema.pre("save", function () {
  this.projectId = uuidv4();
});

module.exports = mongoose.model("Project", ProjectSchema);
