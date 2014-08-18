import tweepy
from random import randint

def setup_api():
	auth = tweepy.OAuthHandler('al7BtDFMYnOvdcFuVTO3EMTdR', 'UUkNGwXTpvinak88zWxXGyj4YGqUEy9qNFC2i8PsP8sJ87oflW')
	auth.set_access_token('2715187026-Fg4A4V3JDObvE5VuXClEYnOLhfbndVCVa9SkOU4', 'dlTjjq8lCY4uXBovY9LNX5IrB8cfu2vOtMi4lcIMDSHKT')
	return tweepy.API(auth)

def random_intro():
	intro_list = ['Yo!', 'Check this out!', 'hey!', 'Ahoy!', 'Sup!', 'Salutations!', 'Hiya!' , 'Howdy!', 'Hey Mate!' , 'Heyooo!']
	value = randint(0,len(intro_list) -1)
	intro = intro_list[value]
	return intro

def make_tweet(meat_text):
	api = setup_api()
	intro = random_intro()
	text = intro + " " + meat_text + " was just entered on KritikalStats!"
	api.update_status(text)