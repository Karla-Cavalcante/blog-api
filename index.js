import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt'; 

const app = express();


app.use(cors({
  origin: 'http://localhost:5173', 
}));

app.use(express.json());


const users = [
  { username: 'admin', password: '$2b$10$GdE9C/XR525z72jzNvO9HO/MzkT4xzlwuEZioWBsJ67LffR0O3RJq', role: 'admin' }  // senha: 'senha123' já hasheada
];


let posts = [
  { id: 1, title: "Post 1", content: "Conteúdo do post 1", authorId: 1, comments: [] },
  { id: 2, title: "Post 2", content: "Conteúdo do post 2", authorId: 2, comments: [] }
];


app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  
  const user = users.find((user) => user.username === username);

  if (user) {
    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        res.json({ message: 'Login bem-sucedido', username: user.username, role: user.role });
      } else {
        res.status(401).json({ message: 'Credenciais inválidas' });
      }
    });
  } else {
    res.status(401).json({ message: 'Credenciais inválidas' });
  }
});


app.get('/api/posts', (req, res) => {
  res.json(posts);  
});

app.post('/api/posts', (req, res) => {
  const { title, content, authorId } = req.body;

  if (!title || !content || !authorId) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
  }

  const newPost = {
    id: posts.length + 1,  
    title,
    content,
    authorId,
    comments: []
  };

  posts.push(newPost);  
  return res.status(201).json(newPost);  
});


app.get('/', (req, res) => {
  res.send('Servidor funcionando!');
});


app.post('/api/posts/:id/comments', (req, res) => {
  const postId = parseInt(req.params.id);  
  const { content, authorId } = req.body;  

  const post = posts.find((p) => p.id === postId);  

  if (post) {
    const newComment = { content, authorId, id: post.comments.length + 1 };  
    post.comments.push(newComment);  

    return res.status(201).json(newComment);  
  } else {
    return res.status(404).json({ message: "Post não encontrado" });
  }
});



app.delete('/api/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id); 

  // Encontrar o post
  const postIndex = posts.findIndex((post) => post.id === postId);
  
  if (postIndex !== -1) {
    posts.splice(postIndex, 1); 
    return res.status(200).json({ message: 'Post excluído com sucesso' });
  } else {
    return res.status(404).json({ message: 'Post não encontrado' });
  }
});


const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
