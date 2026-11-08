#!/bin/sh
echo "Abra http://localhost:8000  (rotas: /vendas /bomboniere /cadastro)"
python3 -m http.server 8000
