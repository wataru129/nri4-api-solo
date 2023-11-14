document.addEventListener('DOMContentLoaded', function() {
    // スナックを取得
    document.getElementById('fetchSnacks').addEventListener('click', function() {
        // fetch('/api/v1/snacks')
        //     .then(response => response.json())
        //     .then(data => console.log(data));
        fetch('/api/v1/snacks')
        .then(response => response.json())
        .then(snacks => {
            const snackList = document.getElementById('snackList');
            snackList.innerHTML = ''; // 一覧をクリア
            snacks.forEach(snack => {
                const snackItem = document.createElement('div');
                snackItem.className = 'snack-item';

                const snackImage = document.createElement('img');
                snackImage.src = snack.image; // 画像のURL
                snackImage.className = 'snack-image';

                const snackInfo = document.createElement('div');
                snackInfo.className = 'snack-info';
                snackInfo.innerHTML = `
                    <h3>${snack.name}</h3>
                    <p>${snack.comment}</p>
                `;

                snackItem.appendChild(snackImage);
                snackItem.appendChild(snackInfo);
                snackList.appendChild(snackItem);
            });
        });
    });

    // スナックを追加
    document.getElementById('addSnackForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const postData = {
            name: document.getElementById('name').value,
            kana: document.getElementById('kana').value,
            maker: document.getElementById('maker').value,
            price: document.getElementById('price').value,
            type: document.getElementById('type').value,
            regist: document.getElementById('regist').value,
            url: document.getElementById('url').value,
            tags: document.getElementById('tags').value,
            image: document.getElementById('image').value,
            comment: document.getElementById('comment').value
        };
        console.log(postData);
        fetch('/api/v1/snacks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        })
        .then(response => response.text())
        .then(data => console.log(data));
    });

    // スナックを更新
    document.getElementById('updateSnackForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const updateId = document.getElementById('updateId').value;
        const updateData = {};
        if (document.getElementById('updateName').value) {
            updateData.name = document.getElementById('updateName').value;
        }
        if (document.getElementById('updateKana').value) {
            updateData.kana = document.getElementById('updateKana').value;
        }
        if (document.getElementById('updateMaker').value) {
            updateData.maker = document.getElementById('updateMaker').value;
        }
        if (document.getElementById('updatePrice').value) {
            updateData.price = document.getElementById('updatePrice').value;
        }
        if (document.getElementById('updateType').value) {
            updateData.type = document.getElementById('updateType').value;
        }
        if (document.getElementById('updateRegist').value) {
            updateData.regist = document.getElementById('updateRegist').value;
        }
        if (document.getElementById('updateUrl').value) {
            updateData.url = document.getElementById('updateUrl').value;
        }
        if (document.getElementById('updateTags').value) {
            updateData.tags = document.getElementById('updateTags').value;
        }
        if (document.getElementById('updateImage').value) {
            updateData.image = document.getElementById('updateImage').value;
        }
        if (document.getElementById('updateComment').value) {
            updateData.comment = document.getElementById('updateComment').value;
        }

        console.log(updateData);
        fetch(`/api/v1/snacks/${updateId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateData),
        })
        .then(response => response.text())
        .then(data => console.log(data));
    });

    // スナックを削除
    document.getElementById('deleteSnackForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const deleteId = document.getElementById('deleteId').value;
        fetch(`/api/v1/snacks/${deleteId}`, {
            method: 'DELETE'
        })
        .then(response => response.text())
        .then(data => console.log(data));
    });
});
