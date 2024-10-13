import AsyncHandler from "express-async-handler";

export const updateUser = AsyncHandler(async (req, res) => {
    const { username } = req.body;
    
	try {
        // Find user by ID
		const finduser = await User.findById(req.user._id);
		if (!finduser) {
            return res.status(404).send("User not found!");
		}
        
		// Update the username if provided
		if (username) {
            finduser.username = username;
			await finduser.save(); // Save the updated user
			// console.log("Username updated");
			return res.status(200).send("User updated successfully");
		}
        
		// No changes made if username is not provided
		return res.status(200).send("No changes were made");
	} catch (error) {
        // console.log(error);
		if (!res.headersSent) {
            return res.status(500).send("Error updating user");
		}
	}
});

export const deleteUser = AsyncHandler(async (req, res) => {
	const findUser = await User.findByIdAndDelete(req.user._id);

	if (!findUser) return res.status(404).send("user not found in");
	// console.log("user deleted");
	res.status(200).send("user deleted successfully");
});