// Barrel for the Drizzle schema — faithful port of the PHP MockSocial model
// (docs/mocksocial_php.sql). drizzle.config.ts and src/db/index.ts import here,
// so every table must be re-exported.
export * from "./enums";
export * from "./users";
export * from "./personas";
export * from "./groups";
export * from "./stats";
export * from "./posts";
export * from "./campaign";
export * from "./analytics";
export * from "./scenario";
export * from "./settings";
