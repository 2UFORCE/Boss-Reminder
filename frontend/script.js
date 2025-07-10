let allBosses = []; // Variável global para armazenar os dados dos bosses

// Função para carregar os dados dos bosses
async function loadBosses() {
    try {
        const response = await fetch('../bosses.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        allBosses = data.bosses; // Armazena os bosses na variável global
        console.log('Bosses loaded:', allBosses);

        const bossList = document.getElementById('boss-list');
        const bossSelect = document.getElementById('boss-select');

        // Popula a lista de bosses na UI
        allBosses.forEach(boss => {
            const listItem = document.createElement('li');
            const times = boss.schedule.map(s => s.time).join(', ');
            listItem.innerHTML = `<strong>${boss.name}</strong>: ${times}`;
            bossList.appendChild(listItem);

            // Popula o dropdown de seleção de boss
            const option = document.createElement('option');
            option.value = boss.id;
            option.textContent = boss.name;
            bossSelect.appendChild(option);
        });

        // Adiciona event listener para o dropdown de boss
        bossSelect.addEventListener('change', populateTimes);

        // Popula os horários iniciais se houver um boss selecionado por padrão
        if (bossSelect.value) {
            populateTimes();
        }

    } catch (error) {
        console.error('Could not load bosses:', error);
    }
}

// Função para popular o dropdown de horários com base no boss selecionado
function populateTimes() {
    const bossSelect = document.getElementById('boss-select');
    const timeSelect = document.getElementById('time-select');
    const selectedBossId = bossSelect.value;

    // Limpa as opções anteriores
    timeSelect.innerHTML = '';

    const selectedBoss = allBosses.find(boss => boss.id === selectedBossId);

    if (selectedBoss) {
        selectedBoss.schedule.forEach(scheduleItem => {
            const option = document.createElement('option');
            option.value = scheduleItem.time;
            option.textContent = scheduleItem.time;
            timeSelect.appendChild(option);
        });
    }

    // Adiciona event listener para o dropdown de horário
    timeSelect.addEventListener('change', suggestMessage);

    // Sugere a mensagem inicial se houver um horário selecionado
    if (timeSelect.value) {
        suggestMessage();
    }
}

// Função para sugerir a mensagem do alerta
function suggestMessage() {
    const bossSelect = document.getElementById('boss-select');
    const timeSelect = document.getElementById('time-select');
    const alertMessage = document.getElementById('alert-message');

    const selectedBoss = allBosses.find(boss => boss.id === bossSelect.value);
    const selectedTime = timeSelect.value;

    if (selectedBoss && selectedTime) {
        alertMessage.value = `Alerta de Boss: ${selectedBoss.name} às ${selectedTime} em ${selectedBoss.location}. Preparem-se!`;
    } else {
        alertMessage.value = '';
    }
}

// Chama a função para carregar os bosses quando a página é carregada
document.addEventListener('DOMContentLoaded', loadBosses);

// Adiciona event listener para o botão de enviar alerta (funcionalidade futura)
const sendAlertButton = document.getElementById('send-alert-button');
sendAlertButton.addEventListener('click', async () => {
    const bossSelect = document.getElementById('boss-select');
    const timeSelect = document.getElementById('time-select');
    const alertMessage = document.getElementById('alert-message');

    const bossId = bossSelect.value;
    const time = timeSelect.value;
    const message = alertMessage.value;

    if (!bossId || !time || !message) {
        alert('Por favor, selecione um boss, um horário e digite uma mensagem.');
        return;
    }

    try {
        const response = await fetch('/api/send-alert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ bossId, time, message })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        alert(`Alerta enviado com sucesso! Resposta: ${result.message}`);
        console.log('Alerta enviado:', result);
    } catch (error) {
        console.error('Erro ao enviar alerta:', error);
        alert('Erro ao enviar alerta. Verifique o console para mais detalhes.');
    }
});