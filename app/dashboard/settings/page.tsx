import Delete from "@/components/dashboard/settings/delete";
import General from "@/components/dashboard/settings/general";
import Profile from "@/components/dashboard/settings/profile";

export default function SettingsPage() {
	return (
		<main className="flex flex-col gap-4 px-6 py-4 md:py-6 max-w-3xl w-full mx-auto">
			<Profile />

			<General />

			<Delete />
		</main>
	);
}
