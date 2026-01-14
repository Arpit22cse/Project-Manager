
class UserController{
  async getUserProfile(req, res) {
    // Logic to get user profile
    res.send('User profile endpoint');
  }
  async updateUserProfile(req, res) {
    // Logic to update user profile
    res.send('Update user profile endpoint');
  }
  
}
module.exports = new UserController();