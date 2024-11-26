import {
  mysqlTable,
  mysqlSchema,
  AnyMySqlColumn,
  index,
  primaryKey,
  int,
  varchar,
  text,
  double,
  unique,
  datetime,
} from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export const achievement = mysqlTable(
  "achievement",
  {
    id: int("id").autoincrement().notNull(),
    cv: int("cv").notNull(),
    name: varchar("name", { length: 255 }),
    achievedDate: varchar("achieved_date", { length: 305 }),
    addedBy: int("added_by").notNull(),
    addedDate: varchar("added_date", { length: 30 }).notNull(),
    lastModifiedBy: int("last_modified_by"),
    lastModifiedDate: varchar("last_modified_date", { length: 30 }),
    originalName: varchar("original_name", { length: 255 }),
  },
  (table) => {
    return {
      indexCv1: index("index_cv1").on(table.cv),
      achievementId: primaryKey({
        columns: [table.id],
        name: "achievement_id",
      }),
    };
  },
);

export const activityLog = mysqlTable(
  "activity_log",
  {
    id: int("id").autoincrement().notNull(),
    activity: text("activity").notNull(),
    user: int("user").notNull(),
    organization: int("organization"),
    addedDate: varchar("added_date", { length: 30 }).notNull(),
  },
  (table) => {
    return {
      activityLogId: primaryKey({
        columns: [table.id],
        name: "activity_log_id",
      }),
    };
  },
);

export const apiRequest = mysqlTable(
  "api_request",
  {
    id: int("id").autoincrement().notNull(),
    apiId: varchar("api_id", { length: 255 }),
    object: varchar("object", { length: 255 }),
    created: varchar("created", { length: 255 }),
    promptTokens: varchar("prompt_tokens", { length: 255 }),
    completionTokens: varchar("completion_tokens", { length: 255 }),
    totalTokens: varchar("total_tokens", { length: 255 }),
    request: text("request").notNull(),
    model: varchar("model", { length: 255 }),
    respond: text("respond"),
    sent: varchar("sent", { length: 30 }).notNull(),
    received: varchar("received", { length: 30 }),
    addedBy: int("added_by").notNull(),
    addedDate: varchar("added_date", { length: 30 }).notNull(),
    lastModifiedBy: int("last_modified_by"),
    lastModifiedDate: varchar("last_modified_date", { length: 30 }),
    cv: int("cv"),
  },
  (table) => {
    return {
      apiRequestId: primaryKey({ columns: [table.id], name: "api_request_id" }),
    };
  },
);

export const banner = mysqlTable(
  "banner",
  {
    id: int("id").autoincrement().notNull(),
    description: text("description").notNull(),
    backgroundColor: varchar("background_color", { length: 255 }).notNull(),
    fontColor: varchar("font_color", { length: 255 }).notNull(),
    numberOfDates: varchar("number_of_dates", { length: 30 }).notNull(),
    addedBy: int("added_by").notNull(),
    addedDate: varchar("added_date", { length: 30 }).notNull(),
    lastModifiedBy: int("last_modified_by"),
    lastModifiedDate: varchar("last_modified_date", { length: 30 }),
    timmerStatus: varchar("timmer_status", { length: 10 }).notNull(),
    bannerStatus: varchar("banner_status", { length: 10 }).notNull(),
    endDate: varchar("end_date", { length: 30 }),
  },
  (table) => {
    return {
      bannerId: primaryKey({ columns: [table.id], name: "banner_id" }),
    };
  },
);

export const careerLevel = mysqlTable(
  "career_level",
  {
    id: int("id").autoincrement().notNull(),
    level: varchar("level", { length: 255 }).notNull(),
    price: double("price", { precision: 8, scale: 2 }).notNull(),
    addedBy: int("added_by").notNull(),
    addedDate: varchar("added_date", { length: 30 }).notNull(),
    lastModifiedBy: int("last_modified_by"),
    lastModifiedDate: varchar("last_modified_date", { length: 30 }),
    oldPrice: double("old_price", { precision: 8, scale: 2 }),
  },
  (table) => {
    return {
      careerLevelId: primaryKey({
        columns: [table.id],
        name: "career_level_id",
      }),
    };
  },
);

export const careerLevelTemplate = mysqlTable(
  "career_level_template",
  {
    id: int("id").autoincrement().notNull(),
    careerLevel: int("career_level").notNull(),
    template: int("template").notNull(),
    addedBy: int("added_by"),
    addedDate: varchar("added_date", { length: 30 }),
  },
  (table) => {
    return {
      careerLevelTemplateId: primaryKey({
        columns: [table.id],
        name: "career_level_template_id",
      }),
    };
  },
);

export const certification = mysqlTable(
  "certification",
  {
    id: int("id").autoincrement().notNull(),
    cv: int("cv").notNull(),
    name: varchar("name", { length: 255 }),
    organization: varchar("organization", { length: 255 }),
    issueDate: varchar("issue_date", { length: 30 }),
    addedBy: int("added_by").notNull(),
    addedDate: varchar("added_date", { length: 30 }).notNull(),
    lastModifiedBy: int("last_modified_by"),
    lastModifiedDate: varchar("last_modified_date", { length: 30 }),
    originalName: varchar("original_name", { length: 255 }),
    originalOrganization: varchar("original_organization", { length: 255 }),
  },
  (table) => {
    return {
      indexCv2: index("index_cv2").on(table.cv),
      certificationId: primaryKey({
        columns: [table.id],
        name: "certification_id",
      }),
    };
  },
);

export const company = mysqlTable(
  "company",
  {
    id: int("id").autoincrement().notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    addedBy: int("added_by"),
    adddedDate: varchar("addded_date", { length: 30 }),
    lastModifiedBy: int("last_modified_by"),
    lastModifiedDate: varchar("last_modified_date", { length: 30 }),
  },
  (table) => {
    return {
      companyId: primaryKey({ columns: [table.id], name: "company_id" }),
    };
  },
);

export const coupon = mysqlTable(
  "coupon",
  {
    id: int("id").autoincrement().notNull(),
    coupon: varchar("coupon", { length: 255 }).notNull(),
    usedBy: int("used_by"),
    addedBy: int("added_by").notNull(),
    addedDate: varchar("added_date", { length: 30 }).notNull(),
    lastModifiedBy: int("last_modified_by"),
    lastModifiedDate: varchar("last_modified_date", { length: 30 }),
    discount: int("discount").default(0).notNull(),
    endDate: varchar("end_date", { length: 30 }),
    oneTime: varchar("one_time", { length: 10 }),
    startDate: varchar("start_date", { length: 30 }),
    name: varchar("name", { length: 255 }),
  },
  (table) => {
    return {
      couponId: primaryKey({ columns: [table.id], name: "coupon_id" }),
      uniqueCoupon: unique("unique_coupon").on(table.coupon),
    };
  },
);

export const cv = mysqlTable(
  "cv",
  {
    id: int("id").autoincrement().notNull(),
    firstName: varchar("first_name", { length: 255 }).notNull(),
    lastName: varchar("last_name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    phone: varchar("phone", { length: 255 }).notNull(),
    district: varchar("district", { length: 255 }).notNull(),
    careerLevel: int("career_level").notNull(),
    template: int("template").notNull(),
    jobIndustry: varchar("job_industry", { length: 255 }).notNull(),
    jobPosition: varchar("job_position", { length: 255 }).notNull(),
    status: varchar("status", { length: 255 }).notNull(),
    addedBy: int("added_by").notNull(),
    addedDate: varchar("added_date", { length: 30 }).notNull(),
    lastModifiedBy: int("last_modified_by"),
    lastModifiedDate: varchar("last_modified_date", { length: 30 }),
    edits: int("edits").default(0),
    otp: varchar("otp", { length: 255 }),
    path: text("path"),
    image: text("image"),
    expertise: text("expertise"),
    personalSkill: text("personal_skill"),
    keySkill: text("key_skill"),
    bio: text("bio"),
    price: double("price", { precision: 22, scale: 2 }),
    coupon: int("coupon"),
    discount: double("discount", { precision: 8, scale: 2 }),
    paymentRef: varchar("payment_ref", { length: 255 }),
    paymentStatus: varchar("payment_status", { length: 255 }),
    approvedBy: int("approved_by"),
    coverLetter: text("cover_letter"),
    getUpdates: int("get_updates").default(0),
    cvPath: text("cv_path"),
    approvedDate: varchar("approved_date", { length: 30 }),
    tryWrite: int("try_write").default(0),
    paid: double("paid", { precision: 8, scale: 2 }),
    paymentId: varchar("payment_id", { length: 255 }),
    changes: text("changes"),
    countryCode: varchar("country_code", { length: 5 }),
  },
  (table) => {
    return {
      indexEmail: index("index_email").on(table.email),
      indexPhone: index("index_phone").on(table.phone),
      cvId: primaryKey({ columns: [table.id], name: "cv_id" }),
    };
  },
);

export const education = mysqlTable(
  "education",
  {
    id: int("id").autoincrement().notNull(),
    cv: int("cv").notNull(),
    school: varchar("school", { length: 255 }),
    degree: varchar("degree", { length: 255 }),
    fieldOfStudy: varchar("field_of_study", { length: 255 }),
    startDate: varchar("start_date", { length: 30 }),
    endDate: varchar("end_date", { length: 30 }),
    currentlyStuding: varchar("currently_studing", { length: 255 }),
    addedBy: int("added_by").notNull(),
    addedDate: varchar("added_date", { length: 30 }).notNull(),
    lastModifiedBy: int("last_modified_by"),
    lastModifiedDate: varchar("last_modified_date", { length: 30 }),
    originalSchoolName: varchar("original_school_name", { length: 255 }),
    originalDegree: varchar("original_degree", { length: 255 }),
    originalFieldOfStudy: varchar("original_field_of_study", { length: 255 }),
  },
  (table) => {
    return {
      indexCv: index("index_cv").on(table.cv),
      educationId: primaryKey({ columns: [table.id], name: "education_id" }),
    };
  },
);

export const employmentHistory = mysqlTable(
  "employment_history",
  {
    id: int("id").autoincrement().notNull(),
    cv: int("cv").notNull(),
    companyName: varchar("company_name", { length: 255 }),
    position: varchar("position", { length: 255 }),
    startDate: varchar("start_date", { length: 30 }),
    endDate: varchar("end_date", { length: 30 }),
    currentlyWorking: varchar("currently_working", { length: 255 }),
    jobDuties: text("job_duties"),
    addedBy: int("added_by").notNull(),
    addedDate: varchar("added_date", { length: 30 }).notNull(),
    lastModifiedBy: int("last_modified_by"),
    lastModifiedDate: varchar("last_modified_date", { length: 30 }),
    originalCompanyName: varchar("original_company_name", { length: 255 }),
    originalPosition: varchar("original_position", { length: 255 }),
    originalJobDuties: text("original_job_duties"),
  },
  (table) => {
    return {
      index1: index("Index_1").on(table.cv),
      employmentHistoryId: primaryKey({
        columns: [table.id],
        name: "employment_history_id",
      }),
    };
  },
);

export const englishJobPosition = mysqlTable(
  "english_job_position",
  {
    id: int("id").autoincrement().notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    addedBy: int("added_by"),
    adddedDate: varchar("addded_date", { length: 30 }),
    lastModifiedBy: int("last_modified_by"),
    lastModifiedDate: varchar("last_modified_date", { length: 30 }),
  },
  (table) => {
    return {
      englishJobPositionId: primaryKey({
        columns: [table.id],
        name: "english_job_position_id",
      }),
    };
  },
);

export const expertise = mysqlTable(
  "expertise",
  {
    id: int("id").autoincrement().notNull(),
    jobPosition: int("job_position").notNull(),
    experties: varchar("experties", { length: 255 }).notNull(),
    addedBy: int("added_by").notNull(),
    addedDate: varchar("added_date", { length: 30 }).notNull(),
    lastModifiedBy: int("last_modified_by"),
    lastModifiedDate: varchar("last_modified_date", { length: 30 }),
  },
  (table) => {
    return {
      expertiseId: primaryKey({ columns: [table.id], name: "expertise_id" }),
    };
  },
);

export const fandq = mysqlTable(
  "fandq",
  {
    id: int("id").autoincrement().notNull(),
    question: text("question").notNull(),
    answer: text("answer").notNull(),
    addedBy: int("added_by").notNull(),
    addedDate: varchar("added_date", { length: 30 }).notNull(),
    lastModifiedBy: int("last_modified_by"),
    lastModifiedDate: varchar("last_modified_date", { length: 30 }),
  },
  (table) => {
    return {
      fandqId: primaryKey({ columns: [table.id], name: "fandq_id" }),
    };
  },
);

export const jobIndustry = mysqlTable(
  "job_industry",
  {
    id: int("id").autoincrement().notNull(),
    jobIndustry: varchar("job_industry", { length: 255 }).notNull(),
    addedBy: varchar("added_by", { length: 255 }).notNull(),
    addedDate: varchar("added_date", { length: 30 }).notNull(),
    lastModifiedBy: int("last_modified_by"),
    lastModifiedDate: varchar("last_modified_date", { length: 30 }),
  },
  (table) => {
    return {
      jobIndustryId: primaryKey({
        columns: [table.id],
        name: "job_industry_id",
      }),
    };
  },
);

export const jobPosition = mysqlTable(
  "job_position",
  {
    id: int("id").autoincrement().notNull(),
    position: varchar("position", { length: 255 }).notNull(),
    addedBy: int("added_by"),
    addedDate: varchar("added_date", { length: 30 }),
    lastModifiedBy: int("last_modified_by"),
    lastModifiedDate: varchar("last_modified_date", { length: 30 }),
    sinhalaPosition: varchar("sinhala_position", { length: 255 }),
  },
  (table) => {
    return {
      jobPositionId: primaryKey({
        columns: [table.id],
        name: "job_position_id",
      }),
    };
  },
);

export const keySkill = mysqlTable(
  "key_skill",
  {
    id: int("id").autoincrement().notNull(),
    jobPosition: int("job_position").notNull(),
    skill: varchar("skill", { length: 255 }).notNull(),
    addedBy: int("added_by").notNull(),
    addedDate: varchar("added_date", { length: 30 }).notNull(),
    lastModifiedBy: int("last_modified_by"),
    lastModifiedDate: varchar("last_modified_date", { length: 30 }),
  },
  (table) => {
    return {
      keySkillId: primaryKey({ columns: [table.id], name: "key_skill_id" }),
    };
  },
);

export const parameter = mysqlTable(
  "parameter",
  {
    id: int("id").autoincrement().notNull(),
    parameter: varchar("parameter", { length: 255 }).notNull(),
    value: varchar("value", { length: 255 }).notNull(),
    addedBy: int("added_by").notNull(),
    addedDate: varchar("added_date", { length: 30 }).notNull(),
    lastModifiedBy: int("last_modified_by"),
    lastModifiedDate: varchar("last_modified_date", { length: 30 }),
  },
  (table) => {
    return {
      parameterId: primaryKey({ columns: [table.id], name: "parameter_id" }),
    };
  },
);

export const partnerPayment = mysqlTable(
  "partner_payment",
  {
    id: int("id").autoincrement().notNull(),
    month: int("month").notNull(),
    year: int("year").notNull(),
    amount: double("amount", { precision: 8, scale: 2 }).notNull(),
    total: double("total", { precision: 8, scale: 2 }).notNull(),
    addedBy: int("added_by").notNull(),
    addedDate: varchar("added_date", { length: 30 }).notNull(),
    lastModifiedBy: int("last_modified_by"),
    lastModifiedDate: varchar("last_modified_date", { length: 30 }),
  },
  (table) => {
    return {
      partnerPaymentId: primaryKey({
        columns: [table.id],
        name: "partner_payment_id",
      }),
    };
  },
);

export const payment = mysqlTable(
  "payment",
  {
    id: int("id").autoincrement().notNull(),
    cv: int("cv").notNull(),
    price: double("price", { precision: 8, scale: 2 }).notNull(),
    status: varchar("status", { length: 255 }).notNull(),
    coupon: int("coupon").notNull(),
    discount: double("discount", { precision: 8, scale: 2 }).notNull(),
    ref: varchar("ref", { length: 255 }).notNull(),
    addedBy: int("added_by").notNull(),
    addedDate: varchar("added_date", { length: 30 }).notNull(),
    lastModifiedBy: int("last_modified_by").notNull(),
    lastModifiedDate: varchar("last_modified_date", { length: 30 }),
  },
  (table) => {
    return {
      paymentId: primaryKey({ columns: [table.id], name: "payment_id" }),
    };
  },
);

export const personalSkill = mysqlTable(
  "personal_skill",
  {
    id: int("id").autoincrement().notNull(),
    jobPosition: int("job_position").notNull(),
    skill: varchar("skill", { length: 255 }).notNull(),
    addedBy: int("added_by").notNull(),
    addedDate: varchar("added_date", { length: 30 }).notNull(),
    lastModifiedBy: int("last_modified_by"),
    lastModifiedDate: varchar("last_modified_date", { length: 30 }),
  },
  (table) => {
    return {
      personalSkillId: primaryKey({
        columns: [table.id],
        name: "personal_skill_id",
      }),
    };
  },
);

export const publication = mysqlTable(
  "publication",
  {
    id: int("id").autoincrement().notNull(),
    cv: int("cv").notNull(),
    name: varchar("name", { length: 255 }),
    publishedDate: varchar("published_date", { length: 30 }),
    link: text("link"),
    addedBy: int("added_by").notNull(),
    addedDate: varchar("added_date", { length: 30 }).notNull(),
    lastMoifiedBy: int("last_moified_by"),
    lastModifiedDate: varchar("last_modified_date", { length: 30 }),
    originalName: varchar("original_name", { length: 255 }),
  },
  (table) => {
    return {
      indexCv3: index("index_cv3").on(table.cv),
      publicationId: primaryKey({
        columns: [table.id],
        name: "publication_id",
      }),
    };
  },
);

export const school = mysqlTable(
  "school",
  {
    id: int("id").autoincrement().notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    addedBy: int("added_by"),
    adddedDate: varchar("addded_date", { length: 30 }),
    lastModifiedBy: int("last_modified_by"),
    lastModifiedDate: varchar("last_modified_date", { length: 30 }),
  },
  (table) => {
    return {
      schoolId: primaryKey({ columns: [table.id], name: "school_id" }),
    };
  },
);

export const sms = mysqlTable(
  "sms",
  {
    id: int("id").autoincrement().notNull(),
    cv: int("cv").notNull(),
    sms: varchar("sms", { length: 255 }).notNull(),
    addedBy: int("added_by").notNull(),
    addedDate: varchar("added_date", { length: 30 }).notNull(),
    lastModifiedBy: int("last_modified_by"),
    lastModifiedDate: varchar("last_modified_date", { length: 30 }),
  },
  (table) => {
    return {
      indexCv4: index("index_cv4").on(table.cv),
      smsId: primaryKey({ columns: [table.id], name: "sms_id" }),
    };
  },
);

export const template = mysqlTable(
  "template",
  {
    id: int("id").autoincrement().notNull(),
    careerLevel: int("career_level"),
    numbbrOfPages: int("numbbr_of_pages").notNull(),
    numberOfEmploymentHistory: int("number_of_employment_history").notNull(),
    numberOfJobDuties: int("number_of_job_duties").notNull(),
    jobDutiesCharacterLimit: int("job_duties_character_limit").notNull(),
    companyNameCharacterLimit: int("company_name_character_limit").notNull(),
    positionCharacterLimit: int("position_character_limit").notNull(),
    numberOfEducation: int("number_of_education").notNull(),
    schoolNameCharacterLimit: int("school_name_character_limit").notNull(),
    degreeNameCharacterLimit: int("degree_name_character_limit").notNull(),
    feildOfStudyCharacterLimit: int("feild_of_study_character_limit").notNull(),
    numberOfAchievement: int("number_of_achievement").notNull(),
    achievmentNameCharacterLimit: int("achievment_name_character_limit").notNull(),
    numberOfCertifications: int("number_of_certifications").notNull(),
    certificationNameCharacterLimit: int("certification_name_character_limit").notNull(),
    organizerCharcterLimit: int("organizer_charcter_limit").notNull(),
    numberOfPublication: int("number_of_publication").notNull(),
    publicationNameCharacterLimit: int("publication_name_character_limit").notNull(),
    numberOfExpertise: int("number_of_expertise").notNull(),
    numberOfPersonalSkills: int("number_of_personal_skills").notNull(),
    numberOfKeySkills: int("number_of_key_skills").notNull(),
    withOrWithoutPhoto: varchar("with_or_without_photo", {
      length: 255,
    }).notNull(),
    addedBy: int("added_by").notNull(),
    addedDate: varchar("added_date", { length: 30 }).notNull(),
    lastModifiedBy: int("last_modified_by"),
    lastModifiedDate: varchar("last_modified_date", { length: 30 }),
    title: varchar("title", { length: 255 }).notNull(),
    image: text("image").notNull(),
    expertiseCharacterLimit: int("expertise_character_limit").notNull(),
    personalSkillsCharacterLimit: int("personal_skills_character_limit").notNull(),
    keySkillsCharacterLimit: int("key_skills_character_limit").notNull(),
    description: text("description").notNull(),
    bioNumberOfCharacters: int("bio_number_of_characters").notNull(),
    listPosition: int("list_position"),
    tags: text("tags"),
    detailsTags: text("details_tags"),
    detailsTagsColor: varchar("details_tags_color", { length: 255 }),
    detailsTagsBackgroundColor: varchar("details_tags_background_color", {
      length: 255,
    }),
  },
  (table) => {
    return {
      templateId: primaryKey({ columns: [table.id], name: "template_id" }),
    };
  },
);

export const user = mysqlTable(
  "user",
  {
    id: int("id").autoincrement().notNull(),
    firstName: varchar("first_name", { length: 255 }).notNull(),
    lastName: varchar("last_name", { length: 255 }).notNull(),
    username: varchar("username", { length: 255 }).notNull(),
    address: text("address"),
    email: varchar("email", { length: 255 }),
    logo: text("logo"),
    addedBy: int("added_by"),
    addedDate: varchar("added_date", { length: 30 }),
    lastModifiedBy: int("last_modified_by"),
    lastModifiedDate: varchar("last_modified_date", { length: 30 }),
    authKey: varchar("authKey", { length: 255 }),
    accessToken: varchar("accessToken", { length: 255 }),
    userType: varchar("user_type", { length: 255 }),
    lastLoggedDate: varchar("last_logged_date", { length: 30 }),
    lastLoggedIp: varchar("last_logged_ip", { length: 50 }),
    lastActiveDatetime: varchar("last_active_datetime", { length: 30 }),
    password: varchar("password", { length: 255 }).notNull(),
    organization: int("organization"),
    organizationName: varchar("organization_name", { length: 255 }),
    fullName: varchar("full_name", { length: 255 }),
    mobile: varchar("mobile", { length: 255 }),
  },
  (table) => {
    return {
      userId: primaryKey({ columns: [table.id], name: "user_id" }),
    };
  },
);
