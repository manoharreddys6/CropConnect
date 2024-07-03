// controllers/rssController.js
import { Server as SocketIoServer } from 'socket.io';
import Parser from 'rss-parser';
import http from 'http';

const rssUrl = 'https://www.business-standard.com/rss/industry/agriculture-21704.rss';
let cachedFeed = null;
let io = null;

async function fetchRSSFeed() {
  try {
    const parser = new Parser();
    const feed = await parser.parseURL(rssUrl);
    cachedFeed = feed;
    console.log('RSS feed updated.');

    if (io) {
      io.emit('rssUpdate', cachedFeed);
    }
  } catch (error) {
    console.error('Error fetching RSS feed:', error);
  }
}

export const initializeSocket = (server) => {
  io = new SocketIoServer(server);

  io.on('connection', (socket) => {
    console.log('A user connected.');

    if (cachedFeed) {
      socket.emit('rssUpdate', cachedFeed);
    }

    socket.on('disconnect', () => {
      console.log('User disconnected.');
    });
  });

  fetchRSSFeed();
  setInterval(fetchRSSFeed, 30000);
};

export const getRSSFeed = (req, res) => {
  if (cachedFeed) {
    let html = '<h1>RSS Feed</h1>';
    html += '<ul>';

    cachedFeed.items.forEach(item => {
      html += `<li>
        <a href="${item.link}">${item.title}</a>
        <p>${item.contentSnippet}</p>
        <p><small>${item.pubDate}</small></p>
      </li>`;
    });

    html += '</ul>';
    res.send(html);
  } else {
    res.status(500).send('RSS feed not available');
  }
};
