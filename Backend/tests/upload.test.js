const request = require('supertest');
const path = require('path');
const fs = require('fs');

describe('UploadController - teste de upload de imagem', () => {
  it('deve realizar upload de imagem com sucesso', async () => {
    const imgPath = path.join(__dirname, '../tests/mock/foto_receita.jpg');
    
    const res = await request(global.sailsApp.hooks.http.app)
      .post('/upload')
      .attach('imagem', imgPath); // campo 'imagem' conforme esperado pelo controller

    console.log('RESPOSTA DO UPLOAD:', res.body);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Upload realizado com sucesso!');
    expect(res.body).toHaveProperty('files');
    expect(Array.isArray(res.body.files)).toBe(true);
    expect(res.body.files.length).toBeGreaterThan(0);
  });

  it('deve retornar erro se nenhuma imagem for enviada', async () => {
    const res = await request(global.sailsApp.hooks.http.app)
      .post('/upload');

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message', 'Nenhuma imagem foi enviada.');
  });
});
