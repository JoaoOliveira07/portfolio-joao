# 🔐 GitHub Token Setup (Optional)

## Por que usar um GitHub Token?

### Sem Token (Padrão)
- ✅ Funciona imediatamente
- ⚠️ Mostra apenas dados **públicos**
- ⚠️ Repositórios públicos apenas (7 repos)
- ⚠️ PRs/Issues públicos apenas
- ⚠️ Limite de 60 requisições/hora

### Com Token (Recomendado)
- ✅ Mostra dados **públicos + privados**
- ✅ Todos os repositórios (públicos + privados)
- ✅ Todos os PRs/Issues (incluindo de repos privados)
- ✅ Estatísticas de linguagens mais precisas
- ✅ Limite de 5000 requisições/hora

---

## 📋 Como Configurar

### 1. Criar o Token

1. Acesse: https://github.com/settings/tokens
2. Clique em **"Generate new token (classic)"**
3. Configurações:
   - **Note**: `Portfolio Website`
   - **Expiration**: `No expiration` (ou escolha uma data)
   - **Scopes** (marque essas opções):
     - ✅ `repo` - Full control of private repositories
     - ✅ `read:user` - Read user profile data

4. Clique em **"Generate token"**
5. **COPIE O TOKEN AGORA** (começa com `ghp_...`)
   - ⚠️ Você só verá ele uma vez!

### 2. Adicionar ao Projeto

1. Na pasta `portfolio`, crie o arquivo `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Abra `.env.local` e cole seu token:
   ```env
   GITHUB_TOKEN=ghp_seu_token_aqui
   ```

3. Reinicie o servidor:
   ```bash
   npm run dev
   ```

### 3. Verificar se Funcionou

Acesse http://localhost:3000/api/github e procure por:
```json
{
  "includesPrivateData": true,  // ✅ Token funcionando!
  "total_repos": 15,            // Agora mostra repos privados
  "contributions": {
    "pullRequests": 25,         // Inclui PRs de repos privados
    ...
  }
}
```

---

## 🔒 Segurança

✅ **Seguro**:
- Arquivo `.env.local` está no `.gitignore`
- Token nunca será commitado no Git
- Token só é usado no servidor (API routes)
- Nunca é exposto ao navegador/cliente

❌ **NUNCA**:
- Commit `.env.local` no Git
- Compartilhe seu token publicamente
- Use o token no código do cliente (browser)

---

## ❓ Troubleshooting

**Token não funciona?**
- Verifique se o arquivo é `.env.local` (não `.env` ou `.env.local.example`)
- Confirme que está na pasta `portfolio/` (não na raiz)
- Reinicie o servidor com `npm run dev`
- Verifique se o token começa com `ghp_`

**Ainda mostra `includesPrivateData: false`?**
- O token pode estar inválido ou expirado
- Verifique os scopes: precisa ter `repo` e `read:user`
- Gere um novo token se necessário

---

## 📊 O que Muda com o Token?

| Dado | Sem Token | Com Token |
|------|-----------|-----------|
| **Repositórios** | 7 públicos | 7 públicos + privados |
| **Pull Requests** | 0 (últimos 30 dias) | Todos (incluindo privados) |
| **Issues** | 0 (últimos 30 dias) | Todas (incluindo privadas) |
| **Linguagens** | Apenas de repos públicos | De todos os repos |
| **Rate Limit** | 60 req/hora | 5000 req/hora |

---

## 🚀 Pronto!

Agora seu portfólio mostra **estatísticas completas e precisas** do seu trabalho no GitHub, incluindo projetos privados! 🎉
