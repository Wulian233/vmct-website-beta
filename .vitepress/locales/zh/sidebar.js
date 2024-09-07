const sidebar = {
  '/modpacks': [
    { text: '返回首页', link: 'index' },
    { text: '地图汉化', link: 'map' },
    { text: '地图汉化准则', link: 'rule' },
    { text: '双十一事变', link: 'what' },
    { text: '用户协议', link: 'agreement' },
    { text: '隐私政策', link: 'privacy' },
    {
      text: '整合包汉化',
      collapsed: false,
      items: [
        { text: '奥术学院', link: '/modpacks/arcanum' },
        { text: '蜜蜂空岛2', link: '/modpacks/bee' },
        { text: '更好的空岛', link: '/modpacks/bettermc' },
        { text: '黑石世界', link: '/modpacks/black' },
        { text: 'Bliss', link: '/modpacks/bliss' },
        { text: '洞穴城', link: '/modpacks/cave' },
        { text: '春晓之巫', link: '/modpacks/cottage' },
        { text: '机械动力：星辰', link: '/modpacks/create' },
        { text: '破晓之界', link: '/modpacks/dawn' },
        { text: 'The Decursio Project Expert', link: '/modpacks/decursio' },
        { text: 'Enigmatica 9: Expert E9E', link: '/modpacks/e9e' },
        { text: '幻想领域', link: '/modpacks/fantasy' },
        { text: '喂养奇点生存', link: '/modpacks/feed' },
        { text: '冰雪之域', link: '/modpacks/frozenopolis' },
        { text: '无限协会', link: '/modpacks/if' },
        { text: '地狱起源', link: '/modpacks/infernal' },
        { text: '喷气背包猫', link: '/modpacks/jetpack' },
        { text: '永恒的MC', link: '/modpacks/mce' },
        { text: '中世纪的MC 1.19 Fabric', link: '/modpacks/mmc' },
        { text: 'Muskteer', link: '/modpacks/muskteer' },
        { text: 'FTB Neotech', link: '/modpacks/neotech' },
        { text: '核荒地', link: '/modpacks/nuclear' },
        { text: '天空奥德赛', link: '/modpacks/odyssey' },
        { text: 'FTB建筑师天堂2', link: '/modpacks/paradise2' },
        { text: 'Prey', link: '/modpacks/prey' },
        { text: 'Roguelike冒险与地牢（RAD）', link: '/modpacks/rad' },
        { text: '重生之夜', link: '/modpacks/rotn' },
        { text: '石头世界3', link: '/modpacks/sb3' },
        { text: '星辰工厂', link: '/modpacks/star' },
        { text: '宝藏猎人3', link: '/modpacks/vault' },
        { text: 'FTB Presents Direwolf20 1.19', link: '/modpacks/wolf' },
      ]
    }
  ],
  '/map':[
    { text: '返回首页', link: 'index' },
    { text: '整合包汉化', link: 'modpacks' },
    { text: '地图汉化准则', link: 'rule' },
    { text: '双十一事变', link: 'what' },
    { text: '用户协议', link: 'agreement' },
    { text: '隐私政策', link: 'privacy' },
    {
      text: '地图汉化',
      collapsed: false,
      items: [
        { text: '最终悖论', link: '/map/final' },
        { text: '神界陨落', link: '/map/divinity' },
        { text: '贝维尔小镇', link: '/map/bayville' },
        { text: '死亡竞速2', link: '/map/deathrunner' },
        { text: 'Lumina Complex', link: '/map/lumina' },
        { text: '狂乱之境4', link: '/map/rc4' },
        { text: 'Temple of the Art', link: '/map/tota' },
        { text: 'Would You Rather', link: '/map/wyr' },
      ]
    }
  ],
  '/vmtu':[
    { text: 'VM汉化组', link: 'index' },
    {
      text: '入门',
      collapsed: false,
      items: [
        { text: '功能介绍', link: '/vmtu/' },
        { text: '使用与配置文件', link: '/vmtu/config' },
        { text: '支持版本', link: '/vmtu/support' },
      ]
    }
  ],
}

export default sidebar
