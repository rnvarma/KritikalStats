# -*- coding: utf-8 -*-
from south.utils import datetime_utils as datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding field 'Team.win_percent'
        db.add_column(u'api_team', 'win_percent',
                      self.gf('django.db.models.fields.IntegerField')(default=0),
                      keep_default=False)

        # Adding field 'Round.one_ac'
        db.add_column(u'api_round', 'one_ac',
                      self.gf('django.db.models.fields.CharField')(default='', max_length=200, blank=True),
                      keep_default=False)

        # Adding field 'Round.one_nc'
        db.add_column(u'api_round', 'one_nc',
                      self.gf('django.db.models.fields.CharField')(default='', max_length=200, blank=True),
                      keep_default=False)

        # Adding field 'Round.block'
        db.add_column(u'api_round', 'block',
                      self.gf('django.db.models.fields.CharField')(default='', max_length=200, blank=True),
                      keep_default=False)

        # Adding field 'Round.two_nr'
        db.add_column(u'api_round', 'two_nr',
                      self.gf('django.db.models.fields.CharField')(default='', max_length=200, blank=True),
                      keep_default=False)

        # Adding field 'Judge.aff_percent'
        db.add_column(u'api_judge', 'aff_percent',
                      self.gf('django.db.models.fields.IntegerField')(default=0),
                      keep_default=False)

        # Adding field 'Judge.neg_percent'
        db.add_column(u'api_judge', 'neg_percent',
                      self.gf('django.db.models.fields.IntegerField')(default=0),
                      keep_default=False)


    def backwards(self, orm):
        # Deleting field 'Team.win_percent'
        db.delete_column(u'api_team', 'win_percent')

        # Deleting field 'Round.one_ac'
        db.delete_column(u'api_round', 'one_ac')

        # Deleting field 'Round.one_nc'
        db.delete_column(u'api_round', 'one_nc')

        # Deleting field 'Round.block'
        db.delete_column(u'api_round', 'block')

        # Deleting field 'Round.two_nr'
        db.delete_column(u'api_round', 'two_nr')

        # Deleting field 'Judge.aff_percent'
        db.delete_column(u'api_judge', 'aff_percent')

        # Deleting field 'Judge.neg_percent'
        db.delete_column(u'api_judge', 'neg_percent')


    models = {
        u'api.judge': {
            'Meta': {'object_name': 'Judge'},
            'aff_percent': ('django.db.models.fields.IntegerField', [], {'default': '0'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '50', 'blank': 'True'}),
            'neg_percent': ('django.db.models.fields.IntegerField', [], {'default': '0'}),
            'paradigm': ('django.db.models.fields.TextField', [], {'default': "''", 'blank': 'True'}),
            'school': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '50', 'blank': 'True'})
        },
        u'api.round': {
            'Meta': {'object_name': 'Round'},
            'aff_team': ('django.db.models.fields.related.ForeignKey', [], {'related_name': "'aff_rounds'", 'to': u"orm['api.Team']"}),
            'block': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '200', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'judge': ('django.db.models.fields.related.ManyToManyField', [], {'related_name': "'rounds'", 'symmetrical': 'False', 'to': u"orm['api.Judge']"}),
            'loser': ('django.db.models.fields.related.ForeignKey', [], {'blank': 'True', 'related_name': "'losses'", 'null': 'True', 'to': u"orm['api.Team']"}),
            'neg_team': ('django.db.models.fields.related.ForeignKey', [], {'related_name': "'neg_rounds'", 'to': u"orm['api.Team']"}),
            'one_ac': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '200', 'blank': 'True'}),
            'one_nc': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '200', 'blank': 'True'}),
            'round_num': ('django.db.models.fields.IntegerField', [], {}),
            'tournament': ('django.db.models.fields.related.ManyToManyField', [], {'related_name': "'rounds'", 'symmetrical': 'False', 'to': u"orm['api.Tournament']"}),
            'two_nr': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '200', 'blank': 'True'}),
            'winner': ('django.db.models.fields.related.ForeignKey', [], {'blank': 'True', 'related_name': "'wins'", 'null': 'True', 'to': u"orm['api.Team']"})
        },
        u'api.team': {
            'Meta': {'ordering': "('team_code',)", 'object_name': 'Team'},
            'bids': ('django.db.models.fields.related.ManyToManyField', [], {'related_name': "'bids'", 'symmetrical': 'False', 'to': u"orm['api.Tournament']"}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'team_code': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '50', 'blank': 'True'}),
            'team_name': ('django.db.models.fields.CharField', [], {'default': "''", 'max_length': '100', 'blank': 'True'}),
            'tournaments': ('django.db.models.fields.related.ManyToManyField', [], {'related_name': "'entries'", 'symmetrical': 'False', 'to': u"orm['api.Tournament']"}),
            'win_percent': ('django.db.models.fields.IntegerField', [], {'default': '0'})
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