import {ReactionEnum} from '../types';

class Reaction {
  getReactionImage = (reaction: ReactionEnum) => {
    return {
      like: require('../assets/reactions/like.png'),
      love: require('../assets/reactions/love.png'),
      haha: require('../assets/reactions/haha.png'),
      sad: require('../assets/reactions/sad.png'),
      wow: require('../assets/reactions/wow.png'),
      angry: require('../assets/reactions/angry.png'),
      care: require('../assets/reactions/care.png'),
    }[reaction];
  };

  getReactionText = (reaction: ReactionEnum) => {
    return {
      like: 'Like',
      love: 'Love',
      haha: 'Haha',
      sad: 'Sad',
      wow: 'Wow',
      angry: 'Angry',
      care: 'Care',
    }[reaction];
  };

  getReactionColor = (reaction: ReactionEnum) => {
    return {
      like: '#007AFF',
      love: '#EC3D3D',
      haha: '#F2DC4A',
      sad: '#F2DC4A',
      wow: '#F2DC4A',
      angry: '#F24A4A',
      care: '#EC3D3D',
    }[reaction];
  };
}

export default new Reaction();
