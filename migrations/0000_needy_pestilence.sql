CREATE TABLE `appointments` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`date` text NOT NULL,
	`time_start` text NOT NULL,
	`time_end` text NOT NULL,
	`full_day` integer NOT NULL,
	`category` text NOT NULL,
	`user_id` integer NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`password` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_password_unique` ON `users` (`password`);