CREATE TABLE `nextjs-app-router-browser-extension_post` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(256),
	`created_at` integer DEFAULT 1711280448564 NOT NULL,
	`updated_at` integer DEFAULT 1711280448564
);
--> statement-breakpoint
CREATE INDEX `name_idx` ON `nextjs-app-router-browser-extension_post` (`name`);