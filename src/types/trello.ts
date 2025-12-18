export interface Board {
  id?: string;
  name: string;
  desc?: string;
  closed?: boolean;
  idOrganization?: string | null;
  prefs?: Record<string, any>;
  [key: string]: any;
}
// export interface Board {
//     id: string;
//     name: string;
//     desc: string;
//     closed: boolean;
//     idOrganization: string;
//     shortLink: string;
//     url: string;
//     prefs: BoardPreferences;
//     labels: Label[];
//     members: Member[];
// }

export interface BoardPreferences {
    permissionLevel: string;
    voting: string;
    comments: string;
    invitations: string;
    selfJoin: boolean;
    cardCovers: boolean;
    isTemplate: boolean;
    hideVotes: boolean;
    background: string;
    backgroundColor: string;
    backgroundImage: string;
    backgroundImageScaled: BackgroundImageScaled[];
}

export interface BackgroundImageScaled {
    width: number;
    height: number;
    url: string;
}

export interface Label {
    id: string;
    name: string;
    color: string;
}

export interface Member {
    id: string;
    fullName: string;
    username: string;
    avatarUrl: string;
}