export interface IMemoList {
content: string;
time: string;
}

export interface Memo {
	date: string;
	memoList: IMemoList[];
}