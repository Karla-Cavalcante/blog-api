import bcrypt from 'bcrypt';

const generateHash = async (password) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  console.log(hashedPassword);
};

generateHash('123456');
