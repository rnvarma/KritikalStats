# -*- coding: utf-8 -*-
from south.utils import datetime_utils as datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Deleting field 'Tournament.location'
        db.delete_column(u'api_tournament', 'location')

        # Adding field 'Tournament.loc'
        db.add_column(u'api_tournament', 'loc',
                      self.gf('django.db.models.fields.CharField')(default='', max_length=100, blank=True),
                      keep_default=False)


    def backwards(self, orm):
        # Adding field 'Tournament.location'
        db.add_column(u'api_tournament', 'location',
                      self.gf('django.db.models.fields.CharField')(default='', max_length=100, blank=True),
                      keep_default=False)

        # Deleting field 'Tournament.loc'
        db.delete_column(u'api_tournament', 'loc')


    models = {
        u'api.judge': {
            'Meta': {'object_name': 'Judge'},
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '50', 'blank': 'True'}),
            'paradigm': ('django.db.models.fields.TextField', [], {'default': "''", 'blank': 'True'}),
            'school': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '50', 'blank': 'True'})
        },
        u'api.round': {
            'Meta': {'object_name': 'Round'},
            'aff_team': ('django.db.models.fields.related.ForeignKey', [], {'related_name': "'aff_rounds'", 'to': u"orm['api.Team']"}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'judge': ('django.db.models.fields.related.ManyToManyField', [], {'related_name': "'rounds'", 'symmetrical': 'False', 'to': u"orm['api.Judge']"}),
            'loser': ('django.db.models.fields.related.ForeignKey', [], {'blank': 'True', 'related_name': "'losses'", 'null': 'True', 'to': u"orm['api.Team']"}),
            'neg_team': ('django.db.models.fields.related.ForeignKey', [], {'related_name': "'neg_rounds'", 'to': u"orm['api.Team']"}),
            'round_num': ('django.db.models.fields.IntegerField', [], {}),
            'tournament': ('django.db.models.fields.related.ManyToManyField', [], {'related_name': "'rounds'", 'symmetrical': 'False', 'to': u"orm['api.Tournament']"}),
            'winner': ('django.db.models.fields.related.ForeignKey', [], {'blank': 'True', 'related_name': "'wins'", 'null': 'True', 'to': u"orm['api.Team']"})
        },
        u'api.team': {
            'Meta': {'ordering': "('team_code',)", 'object_name': 'Team'},
            'bids': ('django.db.models.fields.related.ManyToManyField', [], {'related_name': "'bids'", 'symmetrical': 'False', 'to': u"orm['api.Tournament']"}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'team_code': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '50', 'blank': 'True'}),
            'team_name': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '100', 'blank': 'True'}),
            'tournaments': ('django.db.models.fields.related.ManyToManyField', [], {'related_name': "'entries'", 'symmetrical': 'False', 'to': u"orm['api.Tournament']"})
        },
        u'api.tournament': {
            'Meta': {'object_name': 'Tournament'},
            'bid_round': ('django.db.models.fields.IntegerField', [], {'default': '0'}),
            'breaks_to': ('django.db.models.fields.IntegerField', [], {'default': '0'}),
            'curr_rounds': ('django.db.models.fields.IntegerField', [], {'default': '0'}),
            'end_date': ('django.db.models.fields.IntegerField', [], {'default': '0'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'loc': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '100', 'blank': 'True'}),
            'num_entries': ('django.db.models.fields.IntegerField', [], {'default': '0'}),
            'prelims': ('django.db.models.fields.IntegerField', [], {'default': '0'}),
            'registration_date': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '100', 'blank': 'True'}),
            'start_date': ('django.db.models.fields.IntegerField', [], {'default': '0'}),
            'tournament_name': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '50', 'blank': 'True'})
        }
    }

    complete_apps = ['api']