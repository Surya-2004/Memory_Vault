module.exports = (req, res, next) => {
    // Check if the user is authenticated
    const token = req.headers.authorization?.split(" ")[1]; // Expecting "Bearer <token>"
  
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }
  
    try {
      // Verify the token (use the same secret as when generating the token)
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Attach the decoded user data to the request
      next(); // User is authenticated, move to the next middleware or route handler
    } catch (err) {
      res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
  };
  