const User=require('../models/User');
exports.getLeaderboard=async (req,resp,next)=>{
    console.log('haha')
   try {
    const leaderboardEntries= await User.findAll(
        {
            attributes:['name','totalExpenses'],
            order:[['totalExpenses','DESC']]
        }
    )
    console.log('chala to kam se kam');
    resp.status(200).json({leaderboardEntries});
   } catch (error) {
    console.log('chala hi nahi bc');
    resp.status(404).json(error);
   }
}